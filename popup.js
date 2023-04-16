document.getElementById("btnChapter").addEventListener("click", function () {
  main();
});

document.getElementById("btnVerse").addEventListener("click", function () {
  main(true);
});

function main(isVerse = false) {
  var min = 1; // Minimum value for the random number
  var max = 150; // Maximum value for the random number

  // Generate a random number between the minimum and maximum values
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Read the local JSON file
  fetch("psalms.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the value corresponding to the random number from the JSON data
      var value = data[randomNumber];

      // Select the parent element where the list will be created
      const contentSection = document.getElementById("contentElement"); // Replace with the actual ID of your parent element
      const content = document.createElement("div"); // Replace with the
      const ul = document.createElement("ul");
      const p = document.createElement("p");

      const title = document.createElement("h3");
      title.textContent = `Psalms ${++randomNumber}`;
      content.appendChild(title);

      if (isVerse) {
        var wordNumber =
          Math.floor(Math.random() * (value.length - 1 - 0 + 1)) + 0;
        p.textContent = value[wordNumber];
        title.textContent = title.textContent + ":" + ++wordNumber;
        content.appendChild(title);
        content.appendChild(p);
      } else {
        // Create an unordered list element
        // Use forEach to loop through the data array and create list items
        value.forEach((item) => {
          // Create a list item element
          const li = document.createElement("li");

          // Set the text content of the list item to the current item in the data array
          li.textContent = item;

          // Append the list item to the unordered list
          ul.appendChild(li);
          content.appendChild(ul);
        });
      }

      // Append the unordered list to the parent element
      // parentElement.replaceChildren();
      contentSection.replaceChildren(content);
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

main();
