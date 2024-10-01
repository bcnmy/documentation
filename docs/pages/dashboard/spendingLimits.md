---
sidebar_label: "Spending Limits"
sidebar_position: 4
---

# Spending limits & Dashboard notifications

This feature allows you to set limits to the gas usage. You can define global limits or per-user quotas, specifying either transaction count or total gas consumption.

## Add a global limit

Navigate to the Paymaster you have created, then click Rules and Spending.
If this is the first time you are adding a limit the page will look like this:

![new limit](/limits/new_limit.png)

Click on `Add limit` inside the Global Limit card and the new global limit modal will appear.
Inside the modal you will be presented with the option of choosing:

- Threshold type (Gas Spend | Number of user operations)
- Threshold value
- Cycle duration (minimum 1 hour, maximum 23 hours)

After clicking `Create` the limit will be created.

Please note that whenever the limit policy is edited (duration/ threshold/ threshold type), the cycle is reset, and the new cycle starts from the moment of edit.
Pausing/Activating a limit will not reset the cycle.

![add global limit](/limits/global_limit_modal.png)

## Add a user limit

Click on `Add limit` inside the User Limit card and the new user limit modal will appear.
Both the global and the user limit modals are very similar and offer the same options.

![add user limit](/limits/user_limit_modal.png)


## Low Gas Tank Balance Notifications

The Low Gas Tank Balance Notification is designed to alert organizations when the balance in their Paymaster account falls below a predefined threshold, ensuring that they maintain sufficient funds to continue operations without disruption.

### How It Works
- Depletion Rate Monitoring: The system tracks the depletion rate of each Paymaster by monitoring gas usage over time. This data is used to calculate the average gas consumption.

- Threshold Calculation: A threshold is dynamically computed based on the Paymaster’s historical gas usage. The threshold represents the estimated gas consumption for a defined period (3 days).

- Balance Monitoring: The balance of each Paymaster is frequently checked against the calculated threshold. If the balance drops below this threshold, a notification is triggered.

### Notification Process
- When a Paymaster’s balance is below the calculated threshold, the system flags it for notification.
- Notifications are sent to the organization’s owner (email associated with the Paymaster).
- The message informs the organization that their Paymaster is running low on funds, urging them to top up the gas tank. The email includes metadata such as the Paymaster ID, organization name, and relevant links for topping up.
- The system checks Paymasters' balances daily at midnight. When a Paymaster's balance falls below the threshold, the first notification is sent immediately. Subsequent notifications are only sent if 24 hours have passed since the last notification and the balance remains below the threshold.
