'use strict';

// Data
const account1 = {
  owner: 'Magali Rézeau',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2020-04-01T10:17:24.185Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-12T10:51:36.790Z',
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-02-22T23:36:17.929Z',
    '2021-02-23T14:11:59.604Z',
  ],
  currency: 'EUR',
  locale: 'fr-FR',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed >= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
    // const day = `${date.getDay()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
  }
};

const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale,
    {
      style: 'currency',
      currency: currency
    }).format(value);
};

const displayMovements = (account, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  movs.forEach((movement, idx) => {
    const date = new Date(account.movementsDates[idx]);
    const displayDate = formatMovementDate(date, account.locale);
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html =
      `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(movement, account.locale, account.currency)}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = account => {
  const balance = account.movements.reduce((acc, currentValue) => acc + currentValue);
  account.balance = balance;
  labelBalance.textContent = `${formatCurrency(account.balance, account.locale, account.currency)}`;
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumIn.textContent = `${formatCurrency(incomes, account.locale, account.currency)}`;
  const expenses = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumOut.textContent = `${formatCurrency(Math.abs(expenses), account.locale, account.currency)}`;
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, currentValue) => acc + currentValue);

  labelSumInterest.textContent = `${formatCurrency(interest, account.locale, account.currency)}`;
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
  displayMovements(account);
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

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaning time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = '0';
      labelWelcome.textContent = 'Log in to get started';
    }
    // Decrease 1second 
    time--;
  };
  // Set time to 5 minutes 
  let time = 10;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    clearInputFields(inputLoginUsername, inputLoginPin);

    // Display app and message
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // Create current date and time
    const now = new Date();
    const option = {
      day: 'numeric',
      // weekday: 'long',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const locale = currentAccount.locale;
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

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
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    // Reset timer 
    clearInterval(timer);
    startLogOutTimer();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(movement => movement >= amount * 0.1)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 3000);
  }
  clearInputFields(inputLoanAmount);

  // Reset timer 
  clearInterval(timer);
  startLogOutTimer();
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
