
import React, { useEffect } from 'react';
import { Text, FlatList, ActivityIndicator } from 'react-native';
import { useAppContext } from '../AppContext';

const YourComponent = () => {
  const { state, dispatch } = useAppContext();
  const { data, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_DATA_REQUEST' });
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result });
      } catch (err) {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

export default YourComponent;
