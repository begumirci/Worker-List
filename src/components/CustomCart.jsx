import './CustomForm.css';
import '../App.css';

function CustomCart({users,setUser}){

    if(users.length ===0){
        return;
    }

    function deleteCustom(userId){
      setUser(users.filter((user) => user.id !== userId));
    }

    return(
        <div className='custom-list'>
            <div className='cart-header'>
                <h6>İsim</h6>
                <h6>Maaş</h6>
            </div>
            {users.map((user) => (
                <div className='cart' key={user.id} onClick={() => deleteCustom(user.id)}>
                    <div className='cart-name'>{user.name}</div>
                <div className='cart-salary'>{user.salary} ₺</div>
                </div>))
            }
        </div>
    )
}

export default CustomCart