import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function ExpenseTable() {
  // Use useState for managing state in functional components
  const [tableHead] = useState(['Date', 'Store Name', 'Total']);
  const [tableData] = useState([
    ['John', '25', 'New York'],
    ['Alice', '30', 'Los Angeles'],
    ['Bob', '22', 'Chicago'],
  ]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
});
