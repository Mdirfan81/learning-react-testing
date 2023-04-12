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
