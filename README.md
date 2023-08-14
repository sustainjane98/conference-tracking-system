
#  Conference Tracking System (Itemis AG)

You are planning a big programming conference and have received many proposals which have passed the initial screen process but you're having trouble fitting them into the time constraints of the day -- there are so many possibilities! So you write a program to do it for you.

* The conference has multiple tracks each of which has a morning and afternoon session. * Each session contains multiple talks.

* Morning sessions begin at 9am and must finish by 12 noon, for lunch.

* Afternoon sessions begin at 1pm and must finish in time for the networking event.

* The networking event can start no earlier than 4:00 and no later than 5:00.

* No talk title has numbers in it.

* All talk lengths are either in minutes (not hours) or lightning (5 minutes).

* Presenters will be very punctual; there needs to be no gap between sessions.

Note that depending on how you choose to complete this problem, your solution may give a different ordering or combination of talks into tracks. This is acceptable; you don't need to exactly duplicate the sample output given here.


## Features

- Resolve times for talks according to fixed scheme
- Lunch at 12PM
- Network Event Planing between 4PM and 5PM
- Validation of Talk Title (no Numbers)
- ...


## Installation

Install with npm

```bash
  npm install
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/sustainjane98/conference-tracking-system
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Or Start the server in Prod Mode

```bash
  npm run build-prod && npm run prod
```


## Running Tests

To run tests, run the following command

```bash
  npm run test:e2e
```


## Demo

[Conference Tracking System Frontend](https://conference-tracking-system.vercel.app/en)


## Authors

- [@sustainjane98](https://www.github.com/sustainjane98)

