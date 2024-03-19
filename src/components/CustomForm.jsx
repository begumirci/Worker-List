import './CustomForm.css';
import { useState, useEffect } from 'react';
import CustomCart from './CustomCart';
import '../App.css';
import ErrorModal from './ErrorModal';

function CustomForm() {
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [isError, setIserror] = useState(false);
  const [vergi, setVergi] = useState('');
  // const [isSalary, setIsSalary] = useState(false);
  // const [isName,setIsName] = useState(false);

  const [users, setUser] = useState(
    localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : []
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  function addCustom(e) {
    e.preventDefault();

    const yearlySalary = Number(salary) * 12;

    let calculatedTax = 0;

    if (yearlySalary <= 110000) {
      calculatedTax = yearlySalary * 0.15;
    } else if (yearlySalary <= 230000) {
      calculatedTax = (yearlySalary - 110000) * 0.2 + 10500;
    } else if (yearlySalary <= 580000) {
      calculatedTax = (yearlySalary - 230000) * 0.27 + 135000;
    } else if (yearlySalary <= 3000000) {
      calculatedTax = (yearlySalary - 580000) * 0.35 + 135000;
    } else {
      calculatedTax = (yearlySalary - 3000000) * 0.4 + 982000;
    }

    setVergi(calculatedTax);

    const newUser = {
      id: Math.floor(Math.random() * 100),
      name: name.toUpperCase(),
      salary: salary,
      vergi: calculatedTax,
    };

    if (name.trim().length === 0) {
      setIserror(true);
      setError('İsim Girmelisin!');
      // setIsName(true);
      return;
    }

    if (salary < 10000) {
      setIserror(true);
      setError('Maaş 10000₺ Altında Olamaz!');

      // setIsSalary(true);
      return;
    }

    // setIsSalary(false);
    setUser([...users, newUser]);
    setName('');
    setSalary('');
    setVergi('');
  }

  function closeModal() {
    setIserror(false);
  }

  let newList = users;
  if (search) {
    newList = newList.filter((user) =>
      user.name.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))
    );
  }

  return (
    <div className='big-container'>
      <h1>VERGİ HESAPLA</h1>
      <div className='container'>
        {isError ? <ErrorModal error={error} closeModal={closeModal} /> : ''}
        <form className='CustomForm'>
          <label className='custom-name'>
            Çalışan İsmi:
            <input
              type='text'
              placeholder='Çalışan ismi'
              required
              className='input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='custom-salary'>
            Maaş:
            <input
              type='number'
              placeholder='Maaş girin'
              required
              className='input'
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
          <button className='custom-save' onClick={addCustom}>
            Ekle
          </button>
          {/* {isName ? <div className='warning-msg'>Çalışan isminin girilmesi gerekiyor ! </div> : ''}
                {isSalary ? <div className='warning-msg bottom'>Maaşın asgari tutardan fazla olması gerekiyor ! </div> : ''} */}
        </form>
        <CustomCart
          users={users}
          setUser={setUser}
          search={search}
          setSearch={setSearch}
          newList={newList}
        />
      </div>
    </div>
  );
}

export default CustomForm;
