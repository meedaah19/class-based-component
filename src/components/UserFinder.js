import { Fragment,Component } from 'react';

import ErroeBoundary from './ErrorBoundary';
import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  static contextType = UsersContext;


  constructor() {
    super();
    this.state = {
      filteredUsers:[],
      searchTerm: '',
    };
  }

  componentDidMount(){
    this.setState({ filteredUsers: this.context.users});
  }

  componentDidUpdate(prevProps, preState){
    if(preState.searchTerm !== this.state.searchTerm) {
      this.setState ({
        filteredUsers: this.context.users.filter((user) => 
        user.name.includes(this.state.searchTerm)),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({search: event.target.value});
  }

  render(){
    return (
      <Fragment>

        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErroeBoundary>
        <Users users={this.state.filteredUsers} />
        </ErroeBoundary>
        
      </Fragment>
    );
  }
}

  //const UserFinder = () => {
    //const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
    //const [searchTerm, setSearchTerm] = useState('');

    //useEffect(() => {
      //setFilteredUsers(
        //DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
      //);
    //}, [searchTerm]);

    //const searchChangeHandler = (event) => {
      //setSearchTerm(event.target.value);
    //};

    //return (
     // <Fragment>
       // <div className={classes.finder}>
         // <input type='search' onChange={searchChangeHandler} />
        //</div>
        //<Users users={filteredUsers} />
      //</Fragment>
    //);
  //};

export default UserFinder;