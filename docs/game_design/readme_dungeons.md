# Room Especifications

This document describes how to read a dungeon file, which encodes all game design associated with each room.
The same codification will be used to represent each object in the actual code.

#### Room Name
Codifes the room name.
Example: "D0_0"
 - "D0" = dungeon number.  
 - "_0" = room number (the number also reflects the intended exploration order). 

#### Relative Position
Each room will be composed of rows [A-H] and columns [0-9].

#### Goal
Description of the intended game experience for the room.

#### Time
Expected time the player should spend in the room.

#### Contraints
Conditions and restrictions for the room.

#### Portals
Interactive portals that allow the player to change rooms:
  - "Pup" = connects to the room above.
  - "Pdown" = connects to the room below.
  - "Pleft" = connects to the room on the left.
  - "Pright" = connects to the room on the right.
  - "Pspecial" = connects to a specific room, accessible only through this portal.

#### NPCs
Codifies non-playable characters (NPCs).
Example: "n_Dog"
 - "n_" = NPC identifier.  
 - "Dog" = NPC name.

#### Dialogues
Associates dialogue with the dialogues document.
Example: "d0_0a"
 - "d0" = dungeon number.  
 - "_0" = room number.
 - "a" = dialogue identifier.

#### Enemies
Associates an enemy with the enemies document.
Example: "eA_0"
 - "e" = enemy identifier.  
 - "A" = letter representing its archetype.
 - "_0" = variation of the enemy.

#### Objects
Associates objects with the objects document.
Codification: "oxy"
 - "o" = object identifier.  
 - "x" =
       - "i" = interactable.
       - "n" = non-interactable.
 - "y" =
       - If interactable: specifies what it is (e.g., power-up, hole, etc.).
       - If non-interactable:
              - "c" = collides with the player.
              - "n" = does not collide.
Examples:
 - "onn" = a background element (does not interact or collide).

  
