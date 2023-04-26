# Learning React Testing

```ruby
 using React testing library , jest & msw.
 msw for mocking the API responses.
```

### want to run only one test or skip a test

> test.only() => Only this test will run and all the another will skip.

> test.skip() => Will skip the perticular test.

findAllByRole: this may cause the error when there is a race condition. which mean we have 2 API calls it will find the first one and will not wait for 2nd one.
This cause problem, for solving this we use waitFor

```js
render<OrderEntry/>
await waitFor(async ()=>{
    const alerts =  await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
});
```

> screen.debug()
> This will show all code which is in the DOM.

> For Loggin

```js
import {logRoles} from '@testing-library/dom";

test("Button has correct initial color", ()=>{
    const {container} = render(<App />);
    logRoles(container);
})
```

```js
 > Does **_getBy_** fail when there a server call or other async action?
 > need to use await **_findBy_**
 > userEvent method without await? (e.g. user.click() )
 > Read test error output carefully
  > don't get intimidated huge walls of text!

```

```js
Error: unable to find role="role" ==> Either role doesn't exist, or no element with that role that also matches name option. We can use scree.debug(); to see the dom element

```

```js
Error: Warning: An update to component inside a test was not wrapped in act (...)
There was an update to the compoenent after the test completed. Use ***useEffect*** cleanup and ***unmount()***
```

```js
Error: Warning: Can't perform a React state update on an unmounted component. This is no-op, but it indicates a memory leak in your application.
==> There was an updated to the component state after the test completed. Use ***useEffect*** cleanup and unmount()
```

```js
Error: cannect ECONNREFUSED 127.0.0.1
==> There is no Mock Service Worker handler associated with this route and method.
```

### Jest Mock as Props

> In this project we are passing **_setOrderPhase_** as props
> Added a prop to top levelpage compoenets

> May need to pass as prop when rendering in tests
> TypeScripts, PropTypes or other prop validators will require

> How to pass when rendering component in test?
> **_jest.fn()_**
