
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useAppContext } from './AppContext';

const TodoList = () => {
  const { state, dispatch } = useAppContext();
  const { items, loading, error } = state;
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data.slice(0, 5) }); // Lấy 5 bài viết đầu tiên
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      }
    };
    fetchData();
  }, [dispatch]);

  const addItem = () => {
    if (!newItem) return;

    const item = { title: newItem, body: 'This is a new item' };
    dispatch({ type: 'ADD_ITEM', payload: item });
    setNewItem('');
  };

  const deleteItem = (index) => {
    dispatch({ type: 'DELETE_ITEM', payload: index });
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <TextInput
        placeholder="Add new item"
        value={newItem}
        onChangeText={setNewItem}
        style={{ borderWidth: 1, margin: 10, padding: 8 }}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button title="Delete" onPress={() => deleteItem(index)} />
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
