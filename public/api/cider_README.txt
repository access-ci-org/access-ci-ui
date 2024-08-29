##
## CiDeR Resource Groups - Introduction
##
## Background & Design
##

CiDeR is used to maintain public descriptive information about resources by multiple projects (Affiliations)

CiDeR includes (or will) externally visible identifiers that are globally unique across projects.
  -- Resource Identifier (info_resourceid)
  -- Resource Group Identifier (info_groupid)
  -- Resource Group View Identifiers (info_groupviewid)

So that all the information published by ACCESS can be cross-referenced these identifiers should be used in other
database and catalogs to associate information with CiDeR resources or resource groups.

To make the above identifiers globally unique and meaningful (at least to developers and technical staff), we have
chosen to make them look like hostnames: they are derived from real owned domains which identify their scope and
guarantees that they will be unique across projects and affiliations. These identifiers are NOT required to be
DNS resolvable hostnames.

A Resource Group is a collectios of Resources.

A Resource Group View is a collections of Resource Groups that are displayed through a common view or interface.

##
## Example
##

The ACCESS Resource Catalog efforts needs to display resource information organized by resource groups, where resource
groups are made up of 1 or more tightly coupled resources at an RP.

The above design would be applied to this example as follows:

1) Associate all bridges2 related resources to a shared resource group
   These resources (info_resourceid)
    - bridges2-em.psc.access-ci.org
    - bridges2-gpu-ai.psc.access-ci.org
    - bridges2-gpu.psc.access-ci.org
    - bridges2-ocean.psc.access-ci.org
    - bridges2-rm..psc.access-ci.org
   Would all be associated with group (info_groupid): bridges2.psc.access-ci.org

2) Associate resource groups with the ACCESS Resource Catalog view
   These resource groups (info_groupid):
   - aces.tamu.access-ci.org
   - bridges2.psc.access-ci.org
   - expanse.sdsc.access-ci.org
   - <many more groups>
   Would all be associated with the group view (info_groupviewid): resource-catalog.access-ci.org
   
##
## Persona Interfaces
##

ACCESS staff:
- Define Resource Group Views and which Resource Groups are visible through each view
- Document and communicate Resource Groups available for RPs to select

Resource provider staff:
- Associate each of their Resources with one or more Resource Groups

Resource catalog developers:
- Retrieve by API all the Resource Groups associated with info_groupviewid = resource-catalog.access-ci.org
- Retrieve by API all ACCESS affiliated CiDeR resources, which includes what Resource Groups each is in
- Retrieve other information from other sources which must include either the info_resourceid or info_groupid
  that the information is associated with.
- Build a resource catalog wi
  
