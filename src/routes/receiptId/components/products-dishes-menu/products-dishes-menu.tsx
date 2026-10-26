import React from 'react'
import { View } from 'react-native'
import { MenuControls } from './components/menu-controls'
import { MenuList } from './components/menu-list'

type Props = {}

export const ProductsDishesMenu = (props: Props) => {
  return (
    <View className='flex flex-col gap-4 max-w-[60%] w-full pb-28'>
      <MenuControls />
      <MenuList />
    </View>
  )
}