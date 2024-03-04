---
title: Modding Dogmas
---

# Modding Dogmas

The goal with this page is to collect all the dangerous information shared over the years about modding Fallout and TES titles. The main sources are sadly often the most popular ones, such as YouTube videos that keep getting recommended or posts on sites like Nexus Mods or Reddit.

> Keep in mind that this is in no way a complete list, since modding methods and information changes often and obviously I am not aware of all of the info that belongs here.

## Changing uGridsToLoad

- Greatly reduced performance due to the larger memory usage increase per cell and extra objects,
- Larger loading overhead,
- Possible script breakage,
- Things like quests and random encounters could break.

## Cleaning and Ordering Masterlists in xEdit

Masterlists can be used by authors as documentation for the correct load order and for the required mods, even if said mods do not need to be masters. Cleaning masters also breaks plugin loading in GECK because it cannot look for masters recursively.

## Installing Plugins Mid-game

Unless specified otherwise, this is not advised since your save files are essentially a plugin that is loaded last, baked information can override and break any changes new mods introduce, causing bugs and crashes. Mods such as textures and mesh replacements are fine.

## Removing Plugins Mid-game

This is not an intended scenario and will almost always result in all kinds of weird issues. There are cases where the changes or additions in a plugin are safe to disable, but that would require knowing everything the plugin does and how that affects the game. Better to avoid at all times unless you know what you are doing or if you are debugging something.

## Persistence = Bloat

Proven false by TTW which flags the totality of NPCs, creatures and activators as persistent and adds a very tiny amount of data in the save.

## QAC as a Fix

xEdit's Quick Automatic Cleaning function does not do any magic to plugins. It filters for ITMs and removes them, it turns deleted references into initially disabled with the enable parent opposite of player, as a fallback in case that reference was already loaded.

> Some ITMs are intentional, but it is bad practice as a mod author to leave them as such. To avoid your intentional ITMs being cleaned, prepend their name with something like `Intentional ITM` to avoid it being caught in the cleaning process.

## TTW and Fallout 3 Mods

99% of Fallout 3 mods will **NOT** work with Tale Of Two Wastelands, since the plugin format is different and most of the Fallout 3 mods are either badly made or do not take TTW and Fallout New Vegas changes into account.

## Setting Quest Stages

People often do this as a last resort to fix a problem they encounter. Obviously this breaks the natural progression of the quest so any trigger point (and everything it sets in motion) will be skipped, breaking the quest even more and leading to a broken save file. This is why you are supposed to have a working list when you want to start an actual playthrough, since these issues are often not fixable if not starting a new game and letting that quest work properly.

## The COC Command

Skips trigger points and a multitude of things related to any quest you have running or events contained in the cells you skip and teleport to. Especially dangerous if used from the game's main menu since it will create partial character info and once again, broken quests. This command is purely meant for debugging.
