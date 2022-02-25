
# Rewards API

A multi tenant Rewards API written in NestJS. The project uses MongoDB as the database. 


## Badges


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## API Features

- Create new tenant
- Add new rules for rewards
- Apply Reward to a transaction
- Create reward redemption rules
- Fetch all applicabl redemption rules for a transaction
- Apply redemption rule to a transaction
- Get user's current rewards
- Get user's reward ledger


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_CONNECTION`


## Run the api

Clone the project

```bash
  git clone https://github.com/sunnydave/rewards-api.git
```

Go to the project directory

```bash
  cd rewards-apii
```

Install dependencies

```bash
  yarn
```

Devlopment

```bash
  yarn start
```

Watch Mode

```bash
  yarn start:dev
```

Production Mode

```bash
  yarn start:prod
```

## Documentation

The Swagger API documentation for the API can be accessed locally at
[Documentation](http://localhost:3000/documentation)


## Authors

- [@sunnydave](https://www.github.com/sunnydave)


## Feedback

If you have any feedback, please reach out to me at sunny.dave@hey.com
## Roadmap

- Add feature for removing expired rewards from user's reward point

- Add ability for user rewards api to provide which transaction was used to redeem reward points

- Add new API for running custom analytics


## License

[MIT](https://choosealicense.com/licenses/mit/)

