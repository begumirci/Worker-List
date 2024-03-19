import './CustomForm.css';
import '../App.css';

function CustomCart({ users, setUser, search, setSearch, newList }) {
  if (users.length === 0) {
    return;
  }

  function deleteCustom(userId) {
    setUser(users.filter((user) => user.id !== userId));
  }
  console.log(newList);
  return (
    <div className='custom-list'>
      <input
        className='search-input'
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div>
        {newList.map((user) => (
          <div
            className='cart'
            key={user.id}
            onClick={() => deleteCustom(user.id)}
          >
            <div className='cart-name'>
              <h6>İsim:</h6> {user.name}
            </div>
            <div className='cart-salary'>
              <h6>Maaş:</h6>{' '}
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              }).format(user.salary)}
            </div>
            <div className='cart-vergi'>
              <h6>Vergi:</h6>{' '}
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              }).format(user.vergi)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomCart;
