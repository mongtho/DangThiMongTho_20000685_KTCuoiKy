
import React, { useEffect } from 'react';
import { Text, FlatList, ActivityIndicator, Button, View } from 'react-native';
import { useAppContext } from '../AppContext';

const YourComponent = () => {
  const { state, dispatch } = useAppContext();
  const { data, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        // Giới hạn kết quả chỉ lấy 2 bài viết
        dispatch({ type: 'FETCH_SUCCESS', payload: result.slice(0, 2) });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  const handlePost = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Item', body: 'This is a new item' }),
      });
      const newData = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: [...data, newData] });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Button title="Add Data" onPress={handlePost} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default YourComponent;
