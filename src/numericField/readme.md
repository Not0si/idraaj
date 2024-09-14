# Input Number

When using the HTML `<input type="number">` element, several issues or problems can arise depending on how the element is used, browser compatibility, and user interaction.

## Common problems:

### 1. **Lack of Cross-Browser Consistency**

- Different browsers may render the input number field differently, leading to inconsistencies in user experience.

### 2. **Accessibility Issues**

- Some screen readers might not correctly interpret or announce the number input field, making it less accessible to users with disabilities.

### 3. **Limited Range and Step Values**

- The default step value is 1, which may not suit all use cases (e.g., decimal numbers), requiring additional customization.
- The min and max attributes may be ignored if not properly set, leading to invalid inputs.

### 4. **Mobile Input Behavior**

- On mobile devices, the number input field might trigger a numeric keypad, which can be inconvenient if the user needs to enter both numbers and text.
- Some mobile browsers may still allow non-numeric input, causing validation issues.

### 5. **Validation Issues**

- Browsers may enforce number validation, but this can be inconsistent or overridden by incorrect min, max, or step attributes.
- Lack of server-side validation might lead to security risks if relying solely on client-side validation.

### 6. **Localization Problems**

- Number formatting (e.g., use of commas or periods) can vary by locale, leading to confusion or invalid input if not handled correctly.

### 7. **Step Mismatch**

- If the user inputs a number that doesn't match the step attribute (e.g., 0.5 when the step is 1), some browsers may round the value, while others might reject it entirely.

### 8. **JavaScript Compatibility**

- When using JavaScript to manipulate number inputs, unexpected results can occur if the script doesn't properly account for the step, min, and max attributes.

### 9. **Default Value and Empty State Handling**

- If a default value is not set, the input might display as empty, which could lead to confusion or errors if the user doesn't fill it in.
- Some browsers may allow empty input even if the required attribute is set, leading to incomplete form submissions.

### 10. **Mouse Scroll Behavior**

- On some browsers, scrolling the mouse wheel over the input field can change the value, which might be unintuitive or lead to accidental input changes.

### 11. **Negative Numbers and Unexpected Input**

- If negative numbers are not properly handled (e.g., when min is set to a positive value), users might be able to input values that are not allowed.

### 12. **Inconsistent Styling**

- Styling number inputs can be tricky, as different browsers may interpret styles (like padding, margin, or border) differently.

### 13. **Client-Side vs. Server-Side Mismatch**

- Discrepancies between client-side number validation and server-side validation can lead to errors, especially if the server expects a different format or range.

### 14. **User Experience**

- Input controls like up and down arrows for adjusting the value might not be intuitive for all users, especially in large or complex forms.

##

When using the HTML `<input type="text">` element, several issues or problems can arise depending on how the element is used, browser compatibility, and user interaction.

## Ressources

- [Why the number input is the worst input](https://stackoverflow.blog/2022/12/26/why-the-number-input-is-the-worst-input)
- [Unidentified mobile keyboard input](https://stackoverflow.com/questions/59584061/why-is-unidentified-returned-on-keyboard-input-on-mobile)
- [Checklist web number input](https://www.magentaa11y.com/checklist-web/number-input)
