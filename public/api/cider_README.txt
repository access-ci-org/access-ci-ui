##
## CiDeR Resource Groups - Introduction
##

## Background

- CiDeR is used by multiple projects to maintain public descriptive information about resources (Affiliations)
- CiDeR includes these externally visible identifiers that are globally unique across projects (Affiliations)
  -- Resource Identifiers (info_resourceid)
  -- Resource Group Identifiers (info_groupid)
  -- Resource Group View Identifiers (info_groupviewid)

These identifiers should be used in other database and catalogs to associate information with CiDeR resources or
resource groups.


## Design

To make the above identifiers globally unique and meaningful (at least to developers and technical staff), we have
chosen to make them look like DNS hostnames: they are derived from real owned domains that identifies their
scope and guarantees that they will be unique accross projects and affiliations. These identifiers are NOT
required to be DNS resolvable hostnames.

A Resource Group is a collectios of Resources.

A Resource Group View is a collections of Resource Groups that are viewed through the common interface.


## Example

The ACCESS Resource Catalog needs to display resource information organized by resource groups, where resource
groups are made up of 1 or more tightly coupled resources.

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
   
   
## Persona Interfaces

Resource catalog developers:
- retrieve by API all the info_groupviewid=resource-catalog.access-ci.org associated resource groups
- retrieve by API all CiDeR resources affiliated with ACCESS, which includes what groups each resource is in
- retrieve other information from other resources that include either info_resourceid or info_groupid indicating
  what resource or group the information is associated with.
  
ACCESS staff:
- Define resource group views and which resoure groups are in each view

Resource provider staff:
- Associate each of their resoures with one or more resource groups
