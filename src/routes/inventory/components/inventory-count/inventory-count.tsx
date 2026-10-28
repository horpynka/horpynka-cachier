import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useInventoryApi,
  type InventoryDto,
  type InventoryItemDto,
  type SaveInventoryItemDto,
} from '@horpynka/api-sdk';
import cn from 'classnames';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';

import { lightTheme } from '@/src/ui-kit';
import { Modal } from '@/src/ui-kit/components/modal';
import { yupService } from '@/src/utils/yup-service';

import {
  CATEGORY_CHIPS,
  type CountFormValues,
  type InventoryCategory,
  mutationErrorMessage,
  parseActualQuantity,
  quantitiesFromItems,
  toSaveInventoryDto,
} from '../../inventory-quantity';
import { isInventoryReadOnly } from '../../inventory-status';
import { InventoryCountRow } from '../inventory-count-row';

const ACTUALS_REQUIRED_MESSAGE = 'Заповніть фактичну кількість у кожному рядку';

type Props = {
  inventory: InventoryDto;
};

const countSchema = (items: InventoryItemDto[]) =>
  yup.object({
    quantities: yup.object(
      Object.fromEntries(
        items.map((item) => [String(item.id), yupService.optionalCountedQuantity()]),
      ),
    ),
  });

const quantityError = (errors: FieldErrors<CountFormValues>, id: number) => {
  const field = errors.quantities?.[String(id)];

  if (field && typeof field.message === 'string') {
    return field.message;
  }

  return undefined;
};

export const InventoryCount = ({ inventory }: Props) => {
  const router = useRouter();
  const readOnly = isInventoryReadOnly(inventory.status);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<InventoryCategory>('all');
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const completingRef = useRef(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mutateSaveInventoryActualQuantities, mutateCompleteInventory } = useInventoryApi();

  const schema = useMemo(
    () => countSchema(inventory.items) as yup.ObjectSchema<CountFormValues>,
    [inventory.items],
  );

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CountFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantities: quantitiesFromItems(inventory.items),
    },
    shouldUnregister: false,
    mode: 'onBlur',
  });

  const quantities = watch('quantities');
  const isBusy = mutateSaveInventoryActualQuantities.isPending || mutateCompleteInventory.isPending;

  useEffect(() => {
    return () => {
      if (blurTimer.current) {
        clearTimeout(blurTimer.current);
      }
    };
  }, []);

  const chips = useMemo(
    () => [
      { id: 'all' as const, name: 'Усі' },
      ...CATEGORY_CHIPS.filter((chip) =>
        inventory.items.some((item) => item.measurementUnit === chip.id),
      ),
    ],
    [inventory.items],
  );

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return inventory.items.filter((item) => {
      const matchesCategory = category === 'all' || item.measurementUnit === category;
      const matchesSearch = query === '' || item.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, inventory.items, search]);

  const filledCount = inventory.items.filter(
    (item) => typeof parseActualQuantity(quantities?.[String(item.id)]) === 'number',
  ).length;

  const commitItem = (item: InventoryItemDto) => {
    if (readOnly || completingRef.current) {
      return;
    }

    const parsed = parseActualQuantity(getValues(`quantities.${item.id}`));

    if (parsed === undefined || parsed === item.actualQuantity) {
      return;
    }

    setFormError(null);
    mutateSaveInventoryActualQuantities.mutate(
      {
        params: {
          id: inventory.id,
          saveInventoryDto: toSaveInventoryDto([{ id: item.id, actualQuantity: parsed }]),
        },
      },
      {
        onError: (error) => {
          setFormError(mutationErrorMessage(error, 'Не вдалося зберегти фактичну кількість.'));
        },
      },
    );
  };

  const saveItem = (item: InventoryItemDto) => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
    }

    blurTimer.current = setTimeout(() => {
      commitItem(item);
    }, 400);
  };

  const countsFromValues = (values: CountFormValues): SaveInventoryItemDto[] | undefined => {
    const counts: SaveInventoryItemDto[] = [];

    for (const item of inventory.items) {
      const parsed = parseActualQuantity(values.quantities[String(item.id)]);

      if (parsed === undefined) {
        return undefined;
      }

      counts.push({ id: item.id, actualQuantity: parsed });
    }

    return counts;
  };

  const onComplete = handleSubmit(
    (values) => {
      const counts = countsFromValues(values);

      if (!counts || counts.some((count) => count.actualQuantity === null)) {
        setIsCompleteOpen(false);
        setFormError(ACTUALS_REQUIRED_MESSAGE);
        return;
      }

      completingRef.current = true;
      setFormError(null);
      mutateSaveInventoryActualQuantities.mutate(
        {
          params: {
            id: inventory.id,
            saveInventoryDto: toSaveInventoryDto(counts),
          },
          onSettledCallback: () => {
            setIsCompleteOpen(false);
          },
        },
        {
          onSuccess: () => {
            mutateCompleteInventory.mutate(
              {
                params: { id: inventory.id },
                onSettledCallback: () => {
                  completingRef.current = false;
                },
              },
              {
                onSuccess: () => {
                  router.push('/inventory');
                },
                onError: (error) => {
                  setFormError(mutationErrorMessage(error, 'Не вдалося завершити перевірку.'));
                },
              },
            );
          },
          onError: (error) => {
            completingRef.current = false;
            setFormError(mutationErrorMessage(error, 'Не вдалося зберегти фактичні кількості.'));
          },
        },
      );
    },
    () => {
      setIsCompleteOpen(false);
      setFormError('Фактична кількість має бути цілим невід’ємним числом.');
    },
  );

  const openComplete = () => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
    }

    setFormError(null);
    setIsCompleteOpen(true);
  };

  return (
    <View className="min-h-0 flex-1 gap-2">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push('/inventory')}
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-muted"
        >
          <Ionicons name="arrow-back" size={20} color={lightTheme.colors.foreground} />
        </Pressable>
        <Text className="font-bold">Інвентаризація №{inventory.id}</Text>
        <View className="w-10" />
      </View>

      <View className="h-12 flex-row items-center rounded-2xl border border-border bg-card px-3">
        <Ionicons name="search" size={16} color={lightTheme.colors.mutedForeground} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Пошук товару"
          placeholderTextColor={lightTheme.colors.mutedForeground}
          autoCapitalize="none"
          autoCorrect={false}
          className="flex-1 px-3 text-sm text-foreground"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {chips.map((chip) => {
          const selected = category === chip.id;

          return (
            <Pressable
              key={chip.id}
              onPress={() => setCategory(chip.id)}
              className={cn(
                'rounded-full border px-4 py-2',
                selected ? 'border-primary bg-primary' : 'border-border bg-card',
              )}
            >
              <Text
                className={cn(
                  'text-sm font-semibold',
                  selected ? 'text-primary-foreground' : 'text-foreground',
                )}
              >
                {chip.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={rows}
        extraData={{ quantities, errors }}
        keyExtractor={(item) => String(item.id)}
        keyboardShouldPersistTaps="handled"
        className="min-h-0 flex-1"
        contentContainerClassName="gap-2"
        renderItem={({ item }) => (
          <InventoryCountRow
            item={item}
            readOnly={readOnly}
            value={quantities?.[String(item.id)] ?? ''}
            error={quantityError(errors, item.id)}
            registration={register(`quantities.${item.id}`)}
            onCommit={() => saveItem(item)}
          />
        )}
      />

      {formError ? <Text className="text-sm text-destructive">{formError}</Text> : null}

      {!readOnly ? (
        <View className="flex-row items-center justify-between rounded-2xl bg-slate-900 p-4">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-wider text-white/60">Заповнено</Text>
            <Text className="text-lg font-bold text-white">
              {filledCount} / {inventory.items.length}
            </Text>
          </View>
          <Pressable
            disabled={isBusy}
            onPress={openComplete}
            className="rounded-xl bg-primary px-5 py-3 active:opacity-90 disabled:opacity-50"
          >
            <Text className="text-sm font-bold text-primary-foreground">Завершити</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal
        isOpen={isCompleteOpen}
        setIsOpen={setIsCompleteOpen}
        title="Завершити інвентаризацію?"
        actions={[
          {
            label: 'Скасувати',
            variant: 'outline',
            onClick: () => setIsCompleteOpen(false),
          },
          {
            label: 'Завершити',
            loading: isBusy,
            disabled: isBusy,
            onClick: () => {
              onComplete();
            },
          },
        ]}
      />
    </View>
  );
};
