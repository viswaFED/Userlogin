import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/Errormodal';
import Wrapper from '../Helper/Wrapper';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeNameInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const collegeName = collegeNameInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || collegeName.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name college name and age (non-empty values).',
      });
      return;
    }
    // if (collegeName.trim().length === 0 ) {
    //   setError({
    //     title: 'Invalid input',
    //     message: 'Please enter a valid name college Name and age (non-empty values).',
    //   });
    //   return;
    // }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
   
    props.onAddUser(enteredName, enteredUserAge, collegeName);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    collegeNameInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="college">college Name</label>
          <input id="college" type="text" ref={collegeNameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;