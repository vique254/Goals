import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { Quote } from '../quote-class/quote';
import { AlertService } from '../alert-service/alert.service';
import { QuoteRequestService } from '../quote-http/quote-request.service';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  goals:Goal[];
  alertService:AlertService;
  quote:Quote;
  quoteService: any;
 
  deleteGoal(isComplete: any, index: number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("The goal has been deleted")
      }
    }
  } 
 
  toggleDetails(index: string | number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
   }
   addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
     this.goals.push(goal)
   }
 
   constructor(goalService:GoalService, alertService:AlertService, private http:HttpClient) {
     this.goals = goalService.getGoals()
     this.alertService = alertService;
   }
 
   ngOnInit() {
 
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
   }
  
 }