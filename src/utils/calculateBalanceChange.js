export const calculateBalanceChange = (oldTransaction, newTransaction) => {
  let balance = 0;

  if (oldTransaction) {
    if (oldTransaction.type === '+') {
      balance -= oldTransaction.sum;
    } else if (oldTransaction.type === '-') {
      balance += oldTransaction.sum;
    }
  }

  if (newTransaction.type === '+') {
    balance += newTransaction.sum;
  } else if (newTransaction.type === '-') {
    balance -= newTransaction.sum;
  }

  return balance;
};
