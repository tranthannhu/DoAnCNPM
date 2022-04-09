CREATE OR ALTER TRIGGER trigger_recently
ON [dbo].[job_recently]
FOR UPDATE, INSERT
AS 
BEGIN
DECLARE @jobId varchar(256)
DECLARE @userId varchar(256)
DECLARE @rating int
SELECT @userId = inserted.userId FROM inserted
SELECT @jobId = inserted.jobId FROM inserted
BEGIN
BEGIN TRY 
		IF (EXISTS (SELECT TOP 1 index_name FROM [dbo].[applied_job] WHERE userId = @userId AND jobId = @jobId)
		OR EXISTS (SELECT TOP 1 * FROM [dbo].[job_favorite] WHERE userId = @userId AND jobId = @jobId)
		)
		RETURN
		ELSE 
		BEGIN
			DECLARE @count int 
			DECLARE @duedate int
			SELECT @count = count, @duedate = DATEDIFF(day, updatedat, GETDATE()) FROM job_recently where userId = @userId AND jobId = @jobId
			IF(@count = 1)
			BEGIN
				IF (EXISTS(SELECT TOP 1 id from [dbo].[user_rating] where userId = @userId AND jobId = @jobId))
				RETURN
				ELSE 
				BEGIN
				  INSERT INTO [dbo].[user_rating](userId, jobId, rating) values (@userId, @jobId, 3)
				END
			END
			IF (@count = 2 and @duedate > 5) --Check if the period between current day and recently is higher than 5 day 
			BEGIN
				IF (EXISTS(SELECT TOP 1 id from [dbo].[user_rating] where userId = @userId AND jobId = @jobId))
				BEGIN
				   UPDATE [dbo].[user_rating] set rating = 2 where userId = @userId AND jobId = @jobId
				END
				ELSE 
				BEGIN
				  INSERT INTO [dbo].[user_rating](userId, jobId, rating) values (@userId, @jobId, 2)
				END
			END 
			IF (@count = 2 and @duedate < 3)
			BEGIN
				UPDATE [dbo].[user_rating] set rating = 3 where userId = @userId AND jobId = @jobId
			END 
			IF (@count >= 3 and @duedate < 3)
			BEGIN
				UPDATE [dbo].[user_rating] set rating = 4 where userId = @userId AND jobId = @jobId
			END
		END
END TRY
BEGIN CATCH
 PRINT N'ROLL BACK.';  
ROLLBACK TRANSACTION
END CATCH
END
END
