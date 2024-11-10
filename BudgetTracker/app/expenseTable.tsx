import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

interface ExpenseTableProps {
  titles: string[];
  totals: number[];
}

export default function ExpenseTable({ titles, totals }: ExpenseTableProps) {
  // Use useState for managing state in functional components
  const [tableHead] = useState(['Store Name', 'Total']);
  const transactions = [];
  for(let i = 0; i < titles.length; i++) {
    for(let j = 0; j < totals.length; j++) {
      if(i != j) {
        continue;
      }
      let title = titles[i];
      let total = totals[i];
      let transactionTuple = [title, total];
      transactions.push(transactionTuple);
    }
  }


  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={transactions} textStyle={styles.text} />
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
