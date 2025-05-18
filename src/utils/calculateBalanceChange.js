export const calculateBalanceChange = (oldTransaction, newTransaction) => {
  let balance = 0;

  // Віднімаємо стару транзакцію з балансу
  if (oldTransaction) {
    if (oldTransaction.type === '+') {
      balance -= oldTransaction.sum;
    } else if (oldTransaction.type === '-') {
      balance += oldTransaction.sum;
    }
  }

  // Додаємо нову транзакцію до балансу
  if (newTransaction.type === '+') {
    balance += newTransaction.sum;
  } else if (newTransaction.type === '-') {
    balance -= newTransaction.sum;
  }

  return balance;
};
