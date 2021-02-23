'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((movement, idx) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html =
      `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movement}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = account => {
  const balance = account.movements.reduce((acc, currentValue) => acc + currentValue);
  account.balance = balance;
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumIn.textContent = `${incomes}€`;
  const expenses = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumOut.textContent = `${Math.abs(expenses)}€`;
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = (account => {
  //Display movements
  displayMovements(account.movements);
  //Display balance
  calcDisplayBalance(account);
  //Display summary
  calcDisplaySummary(account);
});

const clearInputFields = (input1, input2) => {
  if (input1 && input2) {
    input1.value = '';
    input2.value = '';
    input2.blur();
  } else {
    input1.value = '';
    input1.blur();
  }
};

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    clearInputFields(inputLoginUsername, inputLoginPin);

    //Display app and message
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(account => account.username === inputTransferTo.value);
  clearInputFields(inputTransferTo, inputTransferAmount);

  if (receiverAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username != currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(movement => movement >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  clearInputFields(inputLoanAmount);
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (inputCloseUsername === currentAccount.username && +inputClosePin === currentAccount.pin) {
    const index = accounts.findIndex(account => account.username === currentAccount.username);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  clearInputFields(inputCloseUsername, inputClosePin);
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});