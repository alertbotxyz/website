<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    
    export let updated = false;
    export let disabled = false;

    const dispatch = createEventDispatcher();
</script>

{#if updated}
    <div 
        class="absolute w-full bottom-4 flex flex-row justify-center items-center z-50 left-0"
        in:fly={{ y: 200, duration: 300 }}
        out:fly={{ y: 50, duration: 300 }}
    >
        <div class="flex flex-row 2xs:flex-col justify-between items-center bg-very-dark-primary p-4 rounded-md w-8xx 2xs:w-5/6">
            <span class="text-center xs:text-sm">You have unsaved changes</span>
            <div class="flex flex-row xs:flex-col 2xs:mt-2">
                <button
                    class="bg-light-primary save-changes-button"
                    on:click={() => dispatch("cancelSaveChanges")}
                    aria-label="Reset changes"
                >
                    Reset
                </button>
                <button
                    class="bg-accent save-changes-button"
                    type="submit"
                    disabled={disabled || !updated}
                    on:click={() => dispatch("confirmSaveChanges")}
                    aria-label="Save changes"
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}