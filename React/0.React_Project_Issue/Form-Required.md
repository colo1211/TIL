# Form-Required

* form 에서 제출을 할 때 required가 되지 않았었던 이유 

```
    <S.WrittingInnerForm onSubmit={onSubmitHandler}>
      {/* 모집 유형 */}
      <Kinds
        kinds={kinds}
        setKinds={setKinds}
        setIsScout={setIsScout}
        // btnColor={btnColor}
        // setBtnColor={setBtnColor}
      />

      {/* 제목 */}
      <Title title={title} setTitle={setTitle} />

      {/* 기술 스택 */}
      <S.MainTitle fontSize="3rem" marginTop="5%" marginBottom="3%">
        기술 스택
      </S.MainTitle>

      <CustomDropDown
        dropDownOptions={dropDownOptions}
        setDropDownOptions={setDropDownOptions}
        customOptions={customOptions}
        setCustomOptions={setCustomOptions}
        style={{ width: '100%' }}
        options={skillName}
      />

      {/* 회의환경 및 모집인원 */}
      <MiddleArea
        meeting={meeting}
        setMeeting={setMeeting}
        headCount={headCount}
        setHeadCount={setHeadCount}
        isScout={isScout}
      />

      {/* 지역 */}
      <Region region={region} setRegion={setRegion} AreaOptions={AreaOptions} />

      {/* 참고자료 */}
      <File
        attachment={attachment}
        setAttachment={setAttachment}
        file={file}
        setFile={setFile}
        fileInfo={fileInfo}
        setFileInfo={setFileInfo}
      />

      <Content content={content} setContent={setContent} />

      <S.BtnWrapper>
        <S.BtnLeft>
          <Link to="/">취소</Link>
        </S.BtnLeft>
        <S.BtnRight type="submit">
          {' '}
          등록하기{' '}
        </S.BtnRight>
      </S.BtnWrapper>
    </S.WrittingInnerForm>
```

* 원인
    * form과 제출 버튼(onClick으로) 두 곳에 onSubmitHandler를 적용하고 있었다. 
    * 이렇게 하니, required가 적용되지 않았었다. 
    

* 해결책 
    * 위의 코드대로 하면 정상적으로 동작할 것이다. 
    1. Form 태그에 onSubmitHandler을 하나만 해주면 된다. 
    2. 제출버튼에는 onSubmitHandler를 붙이지 말고, type='submit'을 붙이면 required가 적용된다. 
