<script lang="ts">
    import Finish from "$lib/components/finish.svelte";
    import StageIndicator from "$lib/components/stage-indicator.svelte";
    import { user } from "$lib/store/user.svelte";
    
</script>

<StageIndicator currentStage={4} />

<Finish userName={user.name} />

