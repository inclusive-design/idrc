---
title: ODD
headerBgColor:
  - indigo-100
headerBorderColor:
  - indigo-100
headerTextColor:
  - black
sections: []
---
![ODD: Optimizing Diversity with Disability logo](/media/odd-no-text.gif)

IDRC with the support of Kessler Foundation and Microsoft has launched ODD (Optimizing Diversity with Disability). The goal of ODD is to investigate bias in hiring algorithms using non-disability specific and synthesized disability specific employment data. In the next year, we will work with the community to create synthetic models of resume and job seeker data that will be tested with online hiring systems. Our objective is to better understand how to mitigate algorithmic bias and use this knowledge in future projects to develop algorithms that can optimize diversity.

## Project Architecture

![Project Architecture described below in detail. External data sources are aggregated to from synthetic data sets that will be tested with LinkedIn Recruiter.](/media/architecture.png)

<!--StartFragment-->

### Project Architecture Description 

There are four main phases:

1) collect external data sources, 

2) synthesize data and create an aggregated data set, 

3) test the data set with various hiring filters and 

4) present the data set in multiple formats for new algorithm development, testing and front-end presentation.

The flow of the Current project scope is as follows:

1) Data is collected from external sources such as LinkedIn or Korn Ferry. Help is needed from LinkedIn for their data set. A potential future data set is the Azure open data sets.

2) Next, we will perform co-design with applicants with disabilities to collect the unusual but justifiable evidence of skill that would not be considered by an AI tool to create a synthetic dataset. We will combine the synthetic data with the external data to create an aggregated data set. This work was retained from the original project scope.

3) Next, we will use the LinkedIn Recruiter testing environment to track the number applicants with disabilities chosen for consideration. This work is from the original project plan.

4) We have extended the project scope to include testing with various filters offered by LinkedIn Recruiter and analyzing results to address bias. We will require assistance from LinkedIn for the test environment.

Potential future project scope includes:

1) Publish the aggregated dataset as private Azure datasets as the first option. Other alternatives to make aggregated datasets available to other communities include Frictionless data packages such as using private Github repositories, Azure Postgres SQL or Azure MySQL databases

2) Implement the matching algorithm using LinkedIn API

3) Use the aggregated dataset to train and test the machine learning algorithm in the Machine Learning module

4) When matching resumes with a job description, resumes and the job description will first be preprocessed, then passed along to the matching algorithm

5) Display the matching results on the LinkedIn Recruiter filter interface. Other front end presentation alternatives include reports rendered to a Github repository or other rendered views in other venues

<!--EndFragment-->

![Kessler Foundation logo](/media/kessler-foundation-small.gif)