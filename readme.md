# TRZ (The Resident Zombie) - Backend

## Problem Description

The world, as we know it, has fallen into an apocalyptic scenario. The "Influenzer T-Virus" (a.k.a. Twiter Virus) is transforming human beings into stupid beasts (a.k.a. Zombies), hungry to cancel humans and eat their limbs.

You, the last survivor who knows how to code, will help the resistance by deploying a system to connect the remaining humans. This system will be essential to detect new infections and share resources between the members.

## Requirements

- ***RESTful API***

- **Add survivors to the database**

  *name*, *age*, *gender* and *last location (latitude, longitude)*.

  Each survivor has their inventory of resources/items. The survivor must declare all of their resources in the sign-up process. We will believe they have what they say they have.

- **Update survivor location**

  A survivor must have the ability to update their last location, storing the new latitude/longitude pair in the base (no need to track locations, just replacing the previous one is enough).

- **Flag survivor as infected**

  In a chaotic situation like that, a survivor may inevitably get contaminated by the virus.  When this happens, we need to flag the survivor as infected.

  An infected survivor cannot trade with others, can't access/manipulate their inventory, nor be listed in the reports (infected people are kinda dead anyway, see the item on reports below). So sad when people fall for the Influenzer T-Virus.

  **A survivor is marked as infected when at least five other survivors report their contamination.**

  When a survivor is infected, their inventory items become inaccessible (they cannot trade with others). This rule HAS to be enforced in this backend system.

- **Survivors cannot Add/Remove items from inventory**

  A new user must register their belongings alongside the sign-up process. After that, they can only change their catalog through trading with other survivors. Make sure that an error in the system doesn't end up with corrupted data!

  The items allowed in the inventory are described above in the first feature.

- **Trade items**:

  Survivors can trade items among themselves.

  To do that, they must respect the price table below, where the value of an item is described in terms of points.

  Both sides of the trade should offer the same amount of points. For example, 5 Fiji water and 5 first aid pouch (5 x 14 + 5 x 10) are worth 6 AK47 (6 x 8) plus 6 Cambell Soups (6 x 12) - and yes, you will die without water for a day. You'll also die if you have a severe untreated wound. That's why those items are more expensive than weapons and food!

  The API won't store the trades, but the items will be transferred from one survivor to the other.

| Item              | Points   |
|-------------------|----------|
| 1 Fiji Water      | 14 points |
| 1 Campbell Soup   | 12 points |
| 1 First Aid Pouch | 10 points |
| 1 AK47            |  8 points  |

  As a tip, it's probably good to start the application with a reasonable amount of goods in stock, so it's easier to match prices and quantities for trading.

  Another bonus point: the servers are running hot at the bottom of a cave. Sometimes it glitches out and may stop in the middle of a trading operation. You should try to make sure you won't have corrupted inventories because of an energy shortage!! You know what I mean.
  
  The clever among you must have realized by now that someone can trade all their items for a weapon, kill everybody, and take all the food later. Yeah, that can happen. Bonus points if you have a clever solution for this conundrum.
