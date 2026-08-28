# ms-robot
Discord bot

Note: some code remains from a previous use case where the bot would upload messages in a specific channel to twitter but only if they came from a specific bot, as well as another module that used to sync minecraft messages with the game server that used to run on localhost on a minecraft channel, these are no longer in use

## Role commands

`/addrole` and `/removerole` hand out roles from a per-server list. `/roleconfig` sets
up that list. Everything here needs Manage Roles.

```
/roleconfig managers   add role:@mods     confirm:iknowwhatimdoing
/roleconfig assignable add role:@verified confirm:iknowwhatimdoing
/roleconfig list
```

`managers` is who can use the commands, `assignable` is what they can hand out. Nothing
works until both have something in them. The confirm word is just so you don't change
this by accident, it isn't a secret.

The bot needs Manage Roles as well, and its role has to sit above anything you make
assignable, otherwise Discord won't let it.

Two things to watch: don't put a managers role in the assignable list or people can
hand themselves access, and anything assignable can go to anyone, even roles ranked
above whoever ran the command. So keep it to harmless roles.
