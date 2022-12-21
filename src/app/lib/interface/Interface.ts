/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class Interface{
    itemModalVisible:boolean=false;
    activateModalVisible:boolean=false;
    deactivateModalVisible:boolean=false;
    deleteModalVisible:boolean=false;
    checkedItems:number[]=[];
    
    showItemModal(){
        this.itemModalVisible=true;
    }
    
    hideItemModal(){
        this.itemModalVisible=false;
    }
    
    showActivateModal(){
        this.activateModalVisible=true;
    }
    
    hideActivateModal(){
        this.activateModalVisible=false;
    }
    
    showDeactivateModal(){
        this.deactivateModalVisible=true;
    }
    
    hideDeactivateModal(){
        this.deactivateModalVisible=false;
    }
    
    showDeleteModal(){
        this.deleteModalVisible=true;
    }
    
    hideDeleteModal(){
        this.deleteModalVisible=false;
    }
    
    checkBoxChange(groupId: number, event: any): void {
        if (event.target.checked === true) {
            this.checkedItems.push(groupId);
        }
        else {
            const index = this.checkedItems.indexOf(groupId);

            if (index !== -1) {
                this.checkedItems.splice(index, 1);
            }

        }

    }
}
