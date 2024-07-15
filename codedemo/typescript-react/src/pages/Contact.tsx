//使用react实现一个contact us界面，用户可以填报表单提供要提交的内容，不再引用其他的包
import React from 'react';

const Contact: React.FC = () => {

   const fromparamvalidate = (name:string, email:string, message:string) => {
    if (name.length === 0) {
      alert("Please enter your name.");
      return false;
    }
    if (email.length === 0) {
      alert("Please enter your email address.");
      return false;
    }
    if (message.length === 0) {
      alert("Please enter your message.");
      return false;
    }
    return true;
  }

 const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLInputElement).value;
    if (fromparamvalidate(name, email, message)) {
      alert("Your message has been submitted.");
    }
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" />
        </label>
        <br />
        <input type="submit" value="Submit"  />
      </form>
    </div>
  );
};

