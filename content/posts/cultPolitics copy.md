As of today, the Dean’s discretionary report production faces significant operational challenges due to existing data handling practices and access restrictions.

**Current State Analysis:**
1. **Manual Data Query**:
    - Data retrieval from the Finance team involves manual querying either through the bi.stanford.edu site or using SQLDeveloper.
    - This manual process spans 3-5 hours and is conducted only once per month.

2. **Manual ETL Processes**:
    - Data is manually extracted, transformed, and loaded (ETL) into our development data warehouse.
    - Subsequently, a ticket is raised with the DMR team within University IT to push this data to the production server.
    - While data push to the production server typically takes a few hours, delays up to a week are not uncommon.

3. **Informatica and Oracle Integration**:
    - Informatica captures the data, which is then programmatically queried and inserted into an Oracle database hosting the Humanities and Science Business Intelligence site (hsbi.stanford.edu).

**Access Restriction Challenges:**
1. **Finance Organization (FMS)**:
    - Programmatic access to data has been denied by FMS, with alternatives limited to a daily emailed report for manual extraction by the business intelligence analyst, a process deemed unacceptable and infeasible.

2. **University IT DMR Team**:
    - While our HNSDOIT team has programmatic access to the development server, it lacks permission to autonomously push data to the database without raising and waiting on a ticket through the DMR team. This constraint is a key issue currently being addressed independently of FMS requests.

**Request for Action:**
To optimize our reporting capabilities, including Dean’s discretionary report and other essential financial reports for the Finance organization and Dean of Humanities and Sciences, we urgently request programmatic read-only access to Humanities and Sciences Finance data tied to organization code PAAA and below.

**Boarded Items for Resolution:**
1. **Steps to Improve Data Flow**:
    - Implement automated querying processes to reduce manual effort.
    - Optimize ETL processes to enable faster and more efficient data integration into the production environment.

2. **Access Needs**:
    - Secure daily programmatic read access to relevant finance data.
    - Establish permissions for the HNSDOIT team to autonomously push data to the production database.
