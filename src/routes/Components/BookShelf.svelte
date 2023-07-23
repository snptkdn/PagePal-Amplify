<script>
  export let histories;
</script>
  
<ion-list>
  <ion-list-header>BookShelf</ion-list-header>
  {#each histories as history}
    <ion-item>
      <ion-label>
        <h2>{history.Book.title}</h2>
        <h3>{history.Book.author}</h3>
        <p>{history.Book.description}</p>
      </ion-label>
    </ion-item>
  {/each}
</ion-list>
