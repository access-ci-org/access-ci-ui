##
## CiDeR Resource Groups
##
## Background & Design
##

CiDeR is used to maintain public descriptive information about resources by multiple projects (Affiliations) besides ACCESS

CiDeR includes (or will) externally visible identifiers that are globally unique across projects.
  - Resource Identifier (info_resourceid)
  - Resource Group Identifier (info_groupid)
  - Resource Group View Identifier (info_groupviewid)

So that all the information published by ACCESS can be cross-referenced these identifiers should be used in other
database and catalogs to associate information with CiDeR resources or resource groups.

To make the above identifiers globally unique and meaningful (at least to developers and technical staff), we have
chosen to make them look like hostnames: they are derived from real owned domains which identifies their scope and
guarantees that they will be unique across projects and affiliations. These identifiers do NOT have to be DNS
DNS resolvable.

A Resource Group is a collection of Resources.

A Resource Group View is a collections of Resource Groups that are displayed through a common view or interface.

This design supports any combination of resources and resource groups to be visible through multiple configurable
views. Resource providers associate their resources with groups, and view developers associate groups with their
views. Resource providers and view developers collaborate to define which groups are needed to achive needed
views.

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

Resource Catalog developers:
- Retrieve by API all the Resource Groups associated with their info_groupviewid = resource-catalog.access-ci.org
- Retrieve by API all ACCESS affiliated CiDeR resources, each of which lists what Resource Groups they are a part of
- Retrieve other information from other sources all of which MUST include either the info_resourceid or info_groupid
  that the information is associated with.
- Metadata about the view could be stored somewhere by info_groupviewid
- Build a resource catalog displaying all the resource groups and associated resources
