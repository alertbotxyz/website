<script>
    import TemplateForm from "../../../components/dashboard/templates/TemplateForm.svelte";
    import { createTemplate } from "../../../api/templates";
    import Modal from "../../../components/Modal.svelte";

    $: error = "";
    $: success = false;

    const handleSubmit = e => {
        createTemplate(e.detail).then(({ data, status }) => {
            console.log(data);
            if (status > 299) {
                error = data.message;
                success = false;
            } else {
                error = "";
                success = true;
            }
        });
    };

    const handleModal = () => success = false;
</script>

<span class="text-error ml-16">{error}</span>
<Modal active={success}>
    <div class="modal flex flex-col items-center rounded-md bg-light-primary p-4">
        <i class='bx bx-check-circle text-6xl text-green-400 mt-4'></i>
        <span class="text-3xl font-bold mt-4">Created Template</span>
        <span class="text-gray-400 my-4 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam animi voluptatem</span>
        <div class="flex flex-row w-full justify-center mt-4">
            <button
                class="button bg-dark-primary"
                on:click={handleModal}
            >
                Create another template
            </button>
            <a
                href="/dashboard/templates/send-alert"
                class="button bg-accent"
            >
                Send an alert
            </a>
        </div>
    </div>
</Modal>
<TemplateForm 
    title="Create Template"
    on:submit={handleSubmit}
/>

<style lang="postcss">
    .modal {
        max-width: 600px;
    }
    .modal .button {
        @apply font-bold w-64 text-center mx-4 py-2 rounded-md text-base;
    }
</style>