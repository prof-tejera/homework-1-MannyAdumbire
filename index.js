import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';


/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = async ({ name, hex, compName, compHex }) => {
  // Fetch the colors from the COLORS endpoint.
  let response = await fetch(COLORS);
  let colors = await response.json();

  if (name) {
    colors = colors.filter((color) => {
      // Check if any of the color names match.
      return color.name.toLowerCase().includes(name.toLowerCase())
    });
  }
  if (hex) {
    // Check if any of the color hex matches.
    colors = colors.filter((color) => color.hex === hex);
  }
  if (compName) {
    colors = colors.filter((color) => {
      return color.comp.some(compcolor => {
        // Check if any of the complementary color names match.
        return compcolor.name.toLowerCase().includes(compName.toLowerCase())
      });
    });
  }
  if (compHex) {
    colors = colors.filter((color) => {
      // Check if any of the complementary color hexex matches.
      return color.comp.some(compcolor =>  compcolor.hex === compHex )
    });
  }

  // Return the filtered colors.
  return colors;

};

// Leave this here
export default fetchColors;
