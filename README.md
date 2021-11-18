# Clef Club

This is term project for the CS473 - Introduction to Social Computing. The project main goal was to create a platform to solve 
the CoQuaIn (Communication, Quality control and Interaction) social problem that have haunted the process of musical jamming for years.

# Setup

To run locally, execute:<br>
`npm install`<br>
`npm start`<br>
*Trouble-shooting*: 
    Run `rm package-lock.json` before npm install might fix any trouble running locally. 
    For linux, add `--openssl-legacy-provider` to the scripts (npm start, build, ...)

# Main files
- All main implementation file is located in the **src** folder.
    -  assets: app's assets, including mostly testing images
    -  containers: main page containers
    -  components: reusable components that can be shared among pages

# Coding convention:
- Functional component (Please use () => {}) and hook for stateful component.
- Shared component MUST be put in components/shared/
- Not-shared but big component SHOULD be put in components/ (Example, a complex component of session/view page should be in components/session/view/)
- Avoid putting too much nested JSX. Consider make it at max 3 layers (Use variable to make smaller components and build up from there)

# Authors: 
- Charlie (Hieu)
- John
- Assem
- Ngoc
