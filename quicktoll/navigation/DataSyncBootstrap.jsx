import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import SplashScreen from '../screens/SplashScreen';
import MainTabNavigator from './MainTabNavigator';

import {
  createTables,
  syncProfileFromSupabase,
  syncTollsFromSupabase,
  syncVehiclesFromSupabase,
  syncCardsFromSupabase,
  syncTransactionsFromSupabase,
} from '../db/sqlite';

export default function DataSyncBootstrap({ session }) {
  const db = useSQLiteContext();
  const [ready, setReady] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!session) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    const bootstrap = async () => {
      await createTables(db);
      await syncProfileFromSupabase(db, supabase, session.user.id);
      await syncTollsFromSupabase(db, supabase);
      await syncVehiclesFromSupabase(db, supabase);
      await syncCardsFromSupabase(db,supabase);
      await syncTransactionsFromSupabase(db,supabase);
      setReady(true);
    };

    bootstrap();
  }, [session]);

  if (!ready) return <SplashScreen />;

  return <MainTabNavigator />;
}
