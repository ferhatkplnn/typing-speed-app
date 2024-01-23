import { nanoid } from "@reduxjs/toolkit";

export const getWords = () => {
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi consequuntur quam voluptatibus ut amet id molestiae dolorum eum, sit odio delectus repellendus sapiente quia culpa, facere tempore animi natus similique.Similique aut rem quae nesciunt odit nam quia commodi perferendis? Voluptas, optio accusamus dolores commodi id rerum minima ipsum? Sint animi, mollitia debitis unde soluta cumque inventore quaerat enim eius! Ea, velit sunt! Tempora sit enim magni laudantium repellat eos, debitis iure nisi rerum quibusdam commodi molestiae voluptate repudiandae quae vel perferendis hic sint quam temporibus quos magnam velit asperiores? Adipisci explicabo quis aspernatur! Voluptates iste fugiat aperiam possimus ipsam doloremque quae harum laboriosam alias! Odit unde natus minus repudiandae nisi similique amet sit provident eligendi eos, consequuntur quis illum`;

  const textArray = text.split(" ");

  const data = textArray.map((word) => {
    const id = nanoid();
    // status: correct || wrong || idle || ready
    return { id, word, status: "idle" };
  });

  return data;
};
