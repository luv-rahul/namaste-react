# 🚀 Namaste React: Episode 8 - Let's Get Classy

## 🎓 Class Based Component

> This is a normal class of JavaScript which extends `React.Component` and has a render method which returns some JSX.
>
> `React.Component` comes from React.

### About.js

```js
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <h3>This is Namaste React</h3>
      <User />
      <UserClass />
    </div>
  );
};

export default About;
```

### User.js

```js
const User = () => {
  return (
    <div className="user-card">
      <h2>Name: Rahul</h2>
      <h3>Location: New Delhi</h3>
      <h3>Contact: luv-rahul@github.com</h3>
    </div>
  );
};

export default User;
```

### UserClass.js

```js
import React from "react";

class UserClass extends React.Component {
  render() {
    return (
      <div className="user-card">
        <h2>Name: Rahul</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
      </div>
    );
  }
}

export default UserClass;
```

---

## 📦 Props

### About.js

```js
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <h3>This is Namaste React</h3>
      <User name="Rahul (Function)" />
      <UserClass name="Rahul (Class)" />
    </div>
  );
};

export default About;
```

### User.js

```js
const User = ({ name }) => {
  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <h3>Location: New Delhi</h3>
      <h3>Contact: luv-rahul@github.com</h3>
    </div>
  );
};

export default User;
```

### UserClass.js (With Constructor)

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important
    console.log(props);
  }

  render() {
    return (
      <div className="user-card">
        <h2>Name: {this.props.name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
      </div>
    );
  }
}

export default UserClass;
```

### UserClass.js (With Destructuring)

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important
    console.log(props);
  }

  render() {
    const { name } = this.props;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
      </div>
    );
  }
}

export default UserClass;
```

---

## 📊 States

### User.js (Functional Component)

```js
import { useState } from "react";

const User = ({ name }) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <h3>Location: New Delhi</h3>
      <h3>Contact: luv-rahul@github.com</h3>
      <h4>Count 1: {count}</h4>
      <h4>Count 2: {count2}</h4>
    </div>
  );
};

export default User;
```

### UserClass.js (Class Component)

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
      count2: 1,
    };
  }

  render() {
    const { name } = this.props;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <h4>Count 2: {count2}</h4>
      </div>
    );
  }
}

export default UserClass;
```

---

## 🔄 setState

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
    };
  }

  render() {
    const { name } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <button
          onClick={() => {
            // count = count + 1; // ! NEVER UPDATE LIKE THIS
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count++
        </button>
      </div>
    );
  }
}

export default UserClass;
```

---

## 🔄 Lifecycle Methods

> **Refer:** [React Lifecycle Methods Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### About.js

```js
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="about">
        <h2>About</h2>
        <h3>This is Namaste React</h3>
        <UserClass name="Rahul (Class)" />
      </div>
    );
  }
}

export default About;
```

### UserClass.js

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
    };

    console.log("Child Constructor");
  }

  componentDidMount() {
    console.log("Child componentDidMount");
  }

  render() {
    console.log("Child Render");
    const { name } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <button
          onClick={() => {
            // count = count + 1; // ! NEVER UPDATE LIKE THIS
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count++
        </button>
      </div>
    );
  }
}

export default UserClass;
```

### Output:

```
- Parent Constructor
- Parent Render
- Child Constructor
- Child Render
- Child componentDidMount
- Parent componentDidMount
```

> **Note:** `componentDidMount` is called after the component is fully mounted. So, we usually make API calls in it, after the component is mounted.

---

## 👥 Multiple Children Components

### About.js

```js
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="about">
        <h2>About</h2>
        <h3>This is Namaste React</h3>
        <UserClass name="Rahul (Class)" />
        <UserClass name="Elon (Class)" />
      </div>
    );
  }
}

export default About;
```

### UserClass.js

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
    };

    console.log(this.props.name + "Child Constructor");
  }

  componentDidMount() {
    console.log(this.props.name + "Child componentDidMount");
  }

  render() {
    console.log(this.props.name + "Child Render");
    const { name } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: New Delhi</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <button
          onClick={() => {
            // count = count + 1; // ! NEVER UPDATE LIKE THIS
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count++
        </button>
      </div>
    );
  }
}

export default UserClass;
```

### Expected Output:

```
- Parent Constructor
- Parent Render
- Rahul (Class)Child Constructor
- Rahul (Class)Child Render
- Rahul (Class)Child componentDidMount
- Elon (Class)Child Constructor
- Elon (Class)Child Render
- Elon (Class)Child componentDidMount
- Parent componentDidMount
```

### Actual Output:

```
- Parent Constructor
- Parent Render
- Rahul (Class)Child Constructor
- Rahul (Class)Child Render
- Elon (Class)Child Constructor
- Elon (Class)Child Render
- Rahul (Class)Child componentDidMount
- Elon (Class)Child componentDidMount
- Parent componentDidMount
```

> **React will batch the render phase, then after `componentDidMount` is called together. React's batching increases the performance and optimization.**

---

## 🌐 API Call

### About.js

```js
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="about">
        <h2>About</h2>
        <h3>This is Namaste React</h3>
        <UserClass />
      </div>
    );
  }
}

export default About;
```

### UserClass.js

```js
import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: "https://dummy-photo.com",
      },
    };

    console.log("Child Constructor");
  }

  async componentDidMount() {
    console.log("Child componentDidMount");

    const data = await fetch("https://api.github.com/users/luv-rahul");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("Child Render");
    const { count } = this.state;
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url}></img>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <button
          onClick={() => {
            // count = count + 1; // ! NEVER UPDATE LIKE THIS
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count++
        </button>
      </div>
    );
  }
}

export default UserClass;
```

### Output:

```
-----Mounting----------
- Parent Constructor
- Parent Render
- Child Constructor
- Child Render // Render with dummy data.
- Child componentDidMount
- Parent componentDidMount

-----Updating---------
- Child Render // State variable change -> Re-Rendered
- componentDidUpdate

----Unmounting-------
Move to another page. This component will be removed from DOM. Then it will be called.
- componentWillUnmount
```

---

## ⚠️ Very Very Important Notes

### 1. Lifecycle Methods in Modern React

> There are no Lifecycle methods in modern React and Functional Components.

### 2. State Variable Changes

**Functional Component:**

```js
useEffect(() => {}, [count, count2]);
```

**Class Component:**

```js
componentDidUpdate(prevState) {
  if (this.state.count != prevState) {
    // Code
  }
  if (this.state.count2 != prevState) {
    // Code
  }
}
```

### 3. Use of componentWillUnmount

> To clear some things.

**Problem:**

```js
componentDidMount() {
  this.timer = setInterval(() => {
    console.log("Namaste Dev Op");
  }, 1000);
}
```

> On changing page, this will still be running and on coming back to the same page, another setInterval is called again. This will make our application performance slower and it is a bad practice.

**Solution:**

```js
componentWillUnmount() {
  clearInterval(this.timer);
}
```

> Now, on unmounting, the `clearInterval` will clear the setInterval.

**Note:** Same behavior will happen in `useEffect`.

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Namaste Dev Op");
  }, 1000);

  // Called on unmounting
  return () => {
    clearInterval(timer);
    console.log("useEffect return");
  };
}, []);
```

---

4. Why don't we write async in useEffect callback function if we call API.

- Reason simple hai: useEffect ka callback async nahi ho sakta, kyunki React ko us callback se cleanup function chahiye hota hai — Promise nahi.
- async fetch(url) promise return karta hai cleanup function nahi.

```js
useEffect(() => {
  // side effect
  return () => {
    // cleanup
  };
}, []);
```
