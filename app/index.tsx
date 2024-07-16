import React from "react";
import { Redirect } from "expo-router";








export default function Index() {

  
  return <Redirect href="/auth" />;
}

// import { useState, useEffect } from 'react'
// import { supabase } from './lib/supabase'
// import Auth from './auth/login'
// import Account from './home/tabs/profile'
// import { View } from 'react-native'
// import { Session } from '@supabase/supabase-js'
// import { Redirect } from 'expo-router'

// export default function App() {

//   return (
//     <View>
//       {session && session.user ? <Redirect  href={'/home'}/> : <Redirect  href={'/auth'}/> }
//     </View>
//   )
// }

// // {/* <Account key={session.user.id} session={session} /> : <Auth /> */}
