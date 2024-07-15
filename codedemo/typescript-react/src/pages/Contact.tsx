//创建一个页面，页面上有个form，用户可以在form上提交自己想提交的信息
import React from 'react';

const Contact: React.FC = () => {
    const formParamsValidate = (name: string, email: string, message: string) => {
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields');
            return false;
        }
        return true;
    };
    
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = e.currentTarget.name.value;
        const email = e.currentTarget.email.value;
        const message = e.currentTarget.message.value;
        if (formParamsValidate(name, email, message)) {
            alert('Submit successfully');
        }
    };
     

  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Message:
          <input type="text" name="message" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
