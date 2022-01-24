---
layout: layouts/page.njk
title: Intelligent User Interfaces for Virtual Healthcare
headerBgColor:
  - indigo-100
headerBorderColor:
  - indigo-100
headerTextColor:
  - black
sections: []
---
Project objective: Reduce barriers to virtual healthcare.

During the pandemic response and recovery, many health units are moving to virtual care. With this transition there is a risk that vulnerable individuals and communities will be excluded which harms and poses risks for the excluded individuals. Inclusive Design Research Centre (IDRC) and the National Research Council (NRC) under the [Pandemic Response Challenge Program](https://nrc.canada.ca/en/research-development/research-collaboration/programs/pandemic-response-challenge-program) collaborated to:

1. create guidelines for virtual healthcare systems that are inclusive and address the diversity of human needs, including cognitive, age-related and cultural barriers.  
2. develop an architecture plan for an openly licensed software platform that enables interaction and interface personalization to meet currently unmet needs faced by individuals when engaging in virtual healthcare.

### Project Links

* Guide for Reducing Barriers to Virtual Healthcare: [Latest web version](https://wiki.fluidproject.org/display/IUIGFVP/Section+-+Guide+for+Reducing+Barriers+to+Virtual+Healthcare), [PDF version July 5 2021](https://wiki.fluidproject.org/download/attachments/237470030/Guide-for-Reducing-Barriers-to-Virtual-Healthcare.pdf)
* [Software Approaches for Expressing Personal Preferences for Healthcare](https://wiki.fluidproject.org/display/IUIGFVP/Section+-+Software+Approaches+for+Expressing+Personal+Preferences+for+Healthcare)
* [Project Wiki](https://wiki.fluidproject.org/display/IUIGFVP/Intelligent+User+Interfaces+and+Guidelines+for+Vulnerable+Populations) - detailed information including methodology, feedback, and future direction

## Outcomes

[Guide for Reducing Barriers to Virtual Healthcare (Guide)](https://wiki.fluidproject.org/display/IUIGFVP/Guide+for+Reducing+Barriers+to+Virtual+Healthcare) –an initial guide that is the result of working with collaborators living in Canada who have personal experiences with the healthcare system, and healthcare professionals with knowledge from their areas of practice.

[Software Approach for Expressing Personal Preferences for Healthcare (Approach)](https://wiki.fluidproject.org/display/IUIGFVP/Section+-+Software+Approaches+for+Expressing+Personal+Preferences+for+Healthcare) which outlines a software architecture that can be used to address inclusion gaps in virtual healthcare settings.

### About the *Guide*

The *Guide* is organized in five sections related to healthcare:

1. Recipients (patients, clients, etc.)
2. Providers (practitioners, clinician, etc.)
3. Technology
4. Systems
5. Empowerment

Each section consists of guidelines covering many scenarios that can help identify areas to improve inclusion and accessibility.

### About the Software Approach

The *Software Approach for Expressing Personal Preferences for Healthcare* outlines a method for reducing barriers using a system that gathers, stores, and applies personal preferences. Implementing this approach can address issues identified by the Guide.

The *Approach* does not prescribe a particular technology, rather it leaves those choices open so system builders. Service providers can customize and configure based on the needs of their infrastructure (i.e. security and privacy needs) and the needs of the stakeholders like patients, caregivers, and practitioners.

## Using the Guide and the Approach

The following examples show how the *Guide* and the *Approach* can be used to reduce barriers to healthcare.

**Healthcare providers** can use the *Guide’s* guidelines to inspire change to their practices and policies for inclusion and access.

Relevant guidelines:

* 5.1 Understandable Communication
* 2.4 Enhancing intake process to personalize service delivery
* 2.6 Improving Service by storing and sharing complimentary information
* 3.3 Interoperability with assistive technology

Possible Service / Policy Change:

* Allow patient to indicate the need of any supports, such as a screen reader or interpreter.
* Policy for all print and digital material machine readable.
* Ensure digital platforms used for virtual visits comply with accessibility standards.
* Service delivery change to prepare additional description during virtual and in-person appointments.

Barriers addressed:

* Some patients / clients have low or no vision and experience challenges when using online virtual visit platform, or during in-person visits.
* Some patients / clients may need translation or assistance in understanding what is being communicated.

**Software developers and platform builders** can use the Guide to create functional specifications and the Approach as a strategy for an architecture that can support personalization for both recipients and providers of care.

Feature:

* Allow patient or caregivers specify preferences for access and care.

Relevant guidelines:

* 1.2 Supports for using technology
* 2.4 Enhancing intake process to personalize service delivery

Example functional specifications:

* Electronic web form that is accessible (WCAG 3 compliant) and is printable.
* Web forms should be understandable in plain language, and easily translatable to another language by a person or software.
* Completing the form should use multiple choice answers to simplify input and processing.
* Using an architecture based on the Personal Preferences Approach, submitted preferences are stored in a central location following privacy and security policies.
* Provide a way for office administrators, clinicians, and doctors to access relevant patient preferences and make meaningful changes to delivery of care.
* Virtual meeting tool can automatically change to meet relevant preferences (i.e. if patient requires readable text, or a particular language, the UI adapts).
* Automated appointment reminders sent via email now include adaptations based on preferences.

## Additional Resources

In addition to the ideas and concepts presented in the Guide and Software Approach, the following resources can be used to broaden inclusion and accessibility of virtual healthcare systems and services:

How to design inclusively:
* [Inclusive Design Guide](https://guide.inclusivedesign.ca/)
* [Community Co-design Kit](https://co-design.inclusivedesign.ca/)

Accessibility:
* [Accessibility Canada](https://accessibilitycanada.ca/resources/)
* [Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/)
* [WebAIM](https://webaim.org/)
* [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
* [CNIB Clear Print Accessibility Guidelines](https://cnib.ca/sites/default/files/2018-07/CNIB%20Clear%20Print%20Guide.pdf)

Policy:
* [Provincial Accessibility Policies and Regulations](https://airtable.com/shr57RHr5jcKO8Kzr)
* [Accessible Canada Act](https://accessible.canada.ca/)

Use of AI and analytics:
* [We Count](https://wecount.inclusivedesign.ca/) – Removing bias and exclusion in the data economy, including resources.

## Funders

Funded by [Pandemic Response Challenge Program](https://nrc.canada.ca/en/research-development/research-collaboration/programs/pandemic-response-challenge-program)
![The logo of the Government of Canada.](/media/canada.png)
