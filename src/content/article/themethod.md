---
title: The Method
description: A full guide to The Method conflict resolution.
keywords:
  - The Method
---

# The Method

In order to make sure that all conflicts between your plugins are intended and/or harmless, you need to check conflicts with xEdit after each mod gets enabled. At every run you can choose how to patch the plugins involved and then you will hide the remaining conflicts thanks to xEdit's ModGroups system. At the end you will have a fully patched load order and every conflict that doesn't need intervention will be hidden, leaving room for additions and ease of patching.

## Requirements

- [Mod Organizer 2](https://github.com/ModOrganizer2/modorganizer/releases/download/v2.5.1rc2/Mod.Organizer-2.5.1rc2.7z): Basic knowledge of the tool is required. You can check what your current version is by looking at its window name on the top left. Vortex is simply too slow and the way it handles load order just makes The Method a pain.
  > **IMPORTANT:** Using MO2 2.4.4 and earlier will cause load order scrambling and other annoying issues.
- [Basics of xEdit](./xedit.html).
- Plenty of **time**.

## Base Plugins ModGroup

The following examples will use a Fallout New Vegas load order, but these concepts are not specific to New Vegas. The Method starts with a load order that **only contains the game's base plugins and the unofficial patch**. In the case of New Vegas, that is **YUP**.

1. **Add `-VQSC`** to the arguments field of xEdit in MO2. This is a quick way to filter your current load order for conflicts. It is faster than a normal filter for conflicts because it skips loading/building the reference caches.
2. **Run xEdit** and wait for it to load the conflict filter.
3. Since all of the conflicts **between DLCs** and **between YUP and DLCs** are accounted for, nothing needs patching here.
4. **Create a ModGroup** for all these plugins by highlighting them (CTRL+A), right-clicking and then selecting `Create ModGroup...`.

> This method of creating a ModGroup by selecting plugins on the left-pane should only be used for this specific case (base plugins + unofficial patch), unless you fully undestand how ModGroups work and the issue with this is.

5. When asked to include the current **CRC32s**, always click **Yes**.
6. In this next menu you can **name the ModGroup** and assign tags to each plugin involved (explained below). The fastest way to name it would be to select the mod you just enabled (in this case YUP) and then pressing CTRL+N.
7. xEdit will then ask you where to store this ModGroup, which means that whenever the chosen plugin is loaded, so will the ModGroup. So in this case, **store it in YUP**.
8. **Close xEdit**.
9. The ModGroup just created will appear in the overwrite folder of MO2, simply take that file and **drag it to the corresponding mod**, which is again, YUP.

## Tags

The most important ones are Target and Source, which are strictly related. The other tags won't be used very often and you can skip them if you wish to simplify learning.

1. **Optional**: Having this plugin disabled will not invalidate the ModGroup, so the remaining conflicts will still be hidden correctly.
2. **Target**: Any conflicting override between this plugin and other sources below will be hidden.
3. **Source**: Any conflicting override between this plugin and other targets above will be hidden.
4. **Forbidden**: The ModGroup becomes invalid if this plugin is loaded.
5. **Ignore LO**: If this option is not selected, the plugin must adhere to the same load order as listed in this ModGroup. This column has two possible values:
   - **Always**: The load order of the plugin is irrelevant.
   - **In Block**: Plugins with this flag form a block when arranged consecutively. Any plugin above the block must load before any plugin within the block. Any plugin below the block must load after any plugin within the block. However, the plugins within the block can load in any order.

## ModGrouping Mods

Right after the base plugins ModGroup:

1. **Enable the next mod** with a plugin,
2. Run **VQSC**,
3. **Patch where needed**,
4. **Reload the conflicts filter** by right-clicking the tree-view and selecting `Apply Filter to show Conflicts`,
5. If there are any, **ModGroup the remaining conflicts** (that are intentional/harmless) with the method explained below and **NOT** the one explained for the base ModGroup,
6. (**Optional**) **Reload the conflicts filter** like before if you want to make sure the ModGroup is hiding all conflicts as intended, the tree-view should result empty,
7. Close xEdit and load the next mod, **rinse and repeat**.

### Example

1. I enabled the mod "Traps Tweaks - Traps Use Other Skills"
2. In xEdit with VQSC, many conflict with YUP showed up:
3. Since I already know the mod is meant to override YUP and the author took YUP's changes into account when editing those scripts, I can assume these conflicts do not need any intervention, so I can already ModGroup them.
4. As hinted before, the ModGrouping method now happens on the right-pane instead of the tree-view, which gives a more granular ModGroup and allows us to achieve the goal of a modular load order.
5. The tags are already correct thanks to this method of ModGrouping. **A consistent naming scheme** is important; mine is "Mod Name" (quickly copied by pressing CTRL+N on it) + the mod it is being ModGrouped against, which is YUP (quickly copied with CTRL+C and with its extension removed).
6. Just to make sure that the ModGroup worked, I reapply the conflict filter and as expected, the tree-view becomes empty (because the only conflicts that were there are now hidden by the ModGroup just created).
