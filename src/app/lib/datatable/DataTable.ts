
import { DataTableResponse } from './DataTableResponse';
import { DataTableOptions } from './DataTableOptions';
import { LibHttp } from '../http/LibHttp';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, merge, Observable, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ElementRef } from '@angular/core';

export class DataTable<T> implements DataSource<T>{

    public data = new BehaviorSubject<T[]>([]);
    public loading = new BehaviorSubject<boolean>(false);

    public paginator: MatPaginator;
    public sort: MatSort;
    public input: ElementRef;

    constructor(private options: DataTableOptions, private libHttp: LibHttp
    ) {

    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.data.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.data.complete();
        //this.loading.complete();
    }

    contentChanged(event: Event) {

    }

    initDataTable() {

        if (!(this.paginator || this.sort || this.input)) {

            return;
        }

        if (this.sort) {

            this.sort.sortChange.subscribe(() => {

                this.paginator.pageIndex = 0;
                this.refresh();
            });
        }

        if (this.input) {

            fromEvent(this.input.nativeElement, 'keyup')
                .pipe(
                    debounceTime(150),
                    distinctUntilChanged(),
                    tap(() => {

                        this.paginator.pageIndex = 0;
                        this.refresh();
                    })
                )
                .subscribe();
        }

        this.paginator.page.subscribe(() => {

            this.refresh();
        });
    }

    refresh(): void {

        this.loading.next(true);

        this.libHttp.post(this.options.url, {
            pageSize: this.paginator.pageSize,
            pageIndex: this.paginator.pageIndex
        })
            .subscribe({
                next: (response: DataTableResponse<T>) => {

                    this.data.next(response.content);
                    this.paginator.length = response.totalElements;

                    this.loading.next(false);
                },
                error: (error) => {
                    console.log('datatable error', error);
                    //this.snackBar.open(error.error.error ? error.error.error : error.error.message, 'x');
                }
            });
    }



}