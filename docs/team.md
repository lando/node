---
description: Learn about the team that made the Node plugin.
layout: page
title: Team
---

<VPLTeamPage>
  <VPLTeamPageTitle>
    <template #title>
      Team
    </template>
    <template #lead>
      We are the people who brought Node to Lando.
    </template>
  </VPLTeamPageTitle>
  <VPLTeamMembers :members="members" size="small"/>
</VPLTeamPage>

<script setup>
import {VPLTeamPage, VPLTeamPageTitle, VPLTeamMembers} from '@lando/vitepress-theme-default-plus'
import {useTeam} from '@lando/vitepress-theme-default-plus';

const members = useTeam();

</script>