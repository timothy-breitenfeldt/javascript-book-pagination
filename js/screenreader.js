/**
 * javascript Screenreader object
 *
 * This object is meant to be used as a means for developers to send custom messages directly to the currently active screenreader
 * without having to setup a sprawling solution to solve the problem.
 * @author Timothy Breitenfeldt
 */

/**
 * This object allows for custom messages to be sent to the active screenreader if any.
 *
 * This object employs the pattern of an empty HTML div tag with the aria-live attribute, inserted somewhere on the page.
 * The div region is hidden visually by using the CSS pattern defined by A11Y Project, but a screenreader is still able to interact with the element.
 * A message is Dynamicly generated into the div region, triggering the aria-live attribute and notifying the screenreader that there is new text in the region to be spoken.
 * The div region is cleared after 100 milla seconds using a call to the built in javascript function setTimeout(),
 *  so that the message won't be stumbled apon by the screenreader user.
 * An argument of interrupt can be given to the constructor and the speak method, which defines weather the aria-live attribute uses a property of polite or assertive.
 * Assertive will interrupt any current messages to speak the new message, where polite will wait until any current messges are done being spoken.
 * The regionID in the constructor is used on the div region if the region needs to be referenced from outside this object.
 * By default, polite is used, and is only changed temporarily to assertive if interrupt is passed as true to speak().
 *
 * This object supports 2 constructors:
 * Screenreader.constructor() - The default value constructor will create a Screenreader object with a default region ID of screenreader-output-region.
 * Screenreader.constructor(regionID) - constructs a Screenreader object with a provided region ID value.
 *
 * Methods:
 * Screenreader.speak(message, interrupt) - Will speak the message given using the optional interrupt value.
 */
class Screenreader {
  /**
   * Constructor
   * Creates an empty div region with an aria-live attribute and default property of polite.
   * This region is then hidden from view using the W3C recommended CSS pattern for hiding an element visually, but still making it visible to a screenreader.
   *
   * @param {*} regionName - an optional parameter to define the name of the region.
   */
  constructor(regionID) {
    this.regionID = "screenreaderOutput";

    if (typeof regionID !== "undefined") {
      this.regionID = regionID;
    }

    this.region = $(`<div id=\"${this.regionId}\" aria-live=\"polite\"></div>`);
    $("body").append(this.region);

    //Hide the region visually.
    this.region.attr(
      "style",
      "boarder: 0; height: 0px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; " +
        "clip: rect(0 0 0 0); clip: rect(0, 0, 0, 0); white-space: nowrap;"
    );
  }

  /**
   * speak(message, interrupt)
   *
   * This method will send a custom message to the currently active screenreader by default using the polite property, or based on the provided boolean value (interrupt).
   * After all processing has been completed, a timer is set to clear the message from the screen after 100 milla seconds to avoid a screenreader stumbling apon the message.
   *
   * @param ${*} message - a string that contains the message to be spoken.
   * @param ${*} interrupt - A option boolean value where true will interrupt any current messages spoken, and false will wait for spoken messages to finish before the new message.
   */
  speak(message, interrupt) {
    if (this.region === null) {
      throw new Error(
        "Screenreader::say(message) error: output region can not be null, either construct Screenreader with an ID, or use Screenreader::setRegion(e)."
      );
    }
    if (typeof interrupt === "undefined" && interrupt) {
      this.region.empty();
      this.region.attr("aria-live", "assertive");
      this.region.append(message);
      this.region.attr("aria-live", "polite");
    } else {
      this.region.append(message);
    }

    let region = this.region;
    setTimeout(function() {
      region.empty();
    }, 100);
  }
}
