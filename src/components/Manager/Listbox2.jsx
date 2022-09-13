import { useState } from "react";

export default function TeamList(props) {
  const [selected, setSelected] = useState();

  function change() {
    alert(selected);
  }
  const handleChange = (event) => {
    setSelected(event.target.value);
    props.addPlayer(event.target.value);
    console.log(event.target.value);
  };
  //   function playerPosition(pos) {
  //     switch (pos) {
  //       case 0:
  //         return "Goalkeeper";
  //         break;

  //       case 1:
  //         return "Defender";
  //         break;
  //       case 2:
  //         return "Midfielder";
  //         break;

  //       case 3:
  //         return "Forward";
  //         break;
  //     }
  //   }
  return (
    <div>
      {selected?.name}
      <select
        id="player"
        value={selected}
        onChange={handleChange}
        name="player"
        autoComplete="player-name"
        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
      >
        {props.player.map((person, index) => (
          <option value={person.playerId} key={index}>
            {person.name + " " + person.attributes[0].value}
          </option>
        ))}
      </select>
    </div>
  );
}
